# Generated by Django 3.1.7 on 2021-03-07 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20210306_2042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='year_handled',
            field=models.CharField(blank=True, choices=[('G1', 'Grade 1'), ('G2', 'Grade 2'), ('G3', 'Grade 3'), ('G4', 'Grade 4'), ('G5', 'Grade 5'), ('G6', 'Grade 6')], max_length=2, null=True),
        ),
    ]