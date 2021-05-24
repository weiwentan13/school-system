# Generated by Django 3.1.7 on 2021-03-06 07:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210223_2143'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='ic_number',
            new_name='contact_number',
        ),
        migrations.RemoveField(
            model_name='student',
            name='is_upperclass',
        ),
        migrations.RemoveField(
            model_name='student',
            name='year_in_school',
        ),
        migrations.AddField(
            model_name='student',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='M', max_length=1),
        ),
        migrations.AddField(
            model_name='student',
            name='name',
            field=models.CharField(default='fdsafdsaf', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='race',
            field=models.SmallIntegerField(choices=[(1, 'Chinese'), (2, 'Indian'), (3, 'Malay'), (4, 'Others')], default=1),
        ),
        migrations.AddField(
            model_name='student',
            name='religion',
            field=models.SmallIntegerField(choices=[(1, 'Christian'), (2, 'Buddha'), (3, 'Muslim'), (4, 'Others')], default=1),
        ),
        migrations.AddField(
            model_name='student',
            name='status',
            field=models.SmallIntegerField(choices=[(1, 'Active'), (2, 'Terminated'), (3, 'Suspended')], default=1),
        ),
        migrations.AddField(
            model_name='student',
            name='year_and_class',
            field=models.CharField(choices=[('1A', '1A'), ('2A', '2A'), ('3A', '3A'), ('4A', '4A'), ('5A', '5A'), ('6A', '6A')], default='1A', max_length=2),
        ),
        migrations.AddField(
            model_name='teacher',
            name='age',
            field=models.SmallIntegerField(default=35),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teacher',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], default='M', max_length=1),
        ),
        migrations.AddField(
            model_name='teacher',
            name='name',
            field=models.CharField(default='fdsfdsaf', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teacher',
            name='race',
            field=models.SmallIntegerField(choices=[(1, 'Chinese'), (2, 'Indian'), (3, 'Malay'), (4, 'Others')], default=1),
        ),
        migrations.AddField(
            model_name='teacher',
            name='religion',
            field=models.SmallIntegerField(choices=[(1, 'Christian'), (2, 'Buddha'), (3, 'Muslim'), (4, 'Others')], default=1),
        ),
        migrations.AlterField(
            model_name='student',
            name='age',
            field=models.SmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='salary',
            field=models.IntegerField(),
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.student')),
            ],
        ),
    ]